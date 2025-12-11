const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Read .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const envVars = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        envVars[key.trim()] = value.trim();
    }
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY'] || envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Could not find Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log('Checking members table...');

    // Check if table exists and get count
    const { count, error } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error connecting to members table:', error.message);
        // Maybe table doesn't exist?
        if (error.code === '42P01') { // undefined_table
            console.log('Table "members" does not exist!');
        }
        return;
    }

    console.log(`Found ${count} members.`);

    if (count === 0) {
        console.log('Members table is empty. Inserting test data...');

        const testMembers = [
            {
                full_name: 'Associado Teste 1',
                email: 'teste1@exemplo.com',
                cpf: '111.111.111-11',
                status: 'ativo',
                start_date: new Date().toISOString(),
                expiration_date: new Date(Date.now() + 31536000000).toISOString(), // +1 year
                phone: '(11) 99999-9999'
            },
            {
                full_name: 'Associado Teste 2',
                email: 'teste2@exemplo.com',
                cpf: '222.222.222-22',
                status: 'expirado',
                start_date: new Date(Date.now() - 31536000000).toISOString(), // -1 year
                expiration_date: new Date(Date.now() - 86400000).toISOString(), // yesterday
                phone: '(21) 88888-8888'
            }
        ];

        const { data, error: insertError } = await supabase
            .from('members')
            .insert(testMembers)
            .select();

        if (insertError) {
            console.error('Error inserting test data:', insertError.message);
        } else {
            console.log('Successfully inserted 2 test members!');
            console.log(data);
        }
    } else {
        console.log('Table has data, skipping seed.');
    }
}

main();
