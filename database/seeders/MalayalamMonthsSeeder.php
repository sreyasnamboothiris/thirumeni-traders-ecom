<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MalayalamMonthsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           DB::table('malayalam_months')->insert([
            ['name_en' => 'Chingam',     'name_ml' => 'ചിങ്ങം'],
            ['name_en' => 'Kanni',       'name_ml' => 'കന്നി'],
            ['name_en' => 'Thulam',      'name_ml' => 'തുലാം'],
            ['name_en' => 'Vrichikam',   'name_ml' => 'വൃശ്ചികം'],
            ['name_en' => 'Dhanu',       'name_ml' => 'ധനു'],
            ['name_en' => 'Makaram',     'name_ml' => 'മകരം'],
            ['name_en' => 'Kumbham',     'name_ml' => 'കുംഭം'],
            ['name_en' => 'Meenam',      'name_ml' => 'മീനം'],
            ['name_en' => 'Metam',       'name_ml' => 'മേടം'],
            ['name_en' => 'Edavam',      'name_ml' => 'ഇടവം'],
            ['name_en' => 'Mithunam',    'name_ml' => 'മിഥുനം'],
            ['name_en' => 'Karkkidakam', 'name_ml' => 'കർക്കിടകം'],
        ]);  

    }
}
