<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MalayalamStarsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           DB::table('malayalam_stars')->insert([
            ['name_en' => 'Aswathi',      'name_ml' => 'അശ്വതി'],
            ['name_en' => 'Bharani',      'name_ml' => 'ഭരണി'],
            ['name_en' => 'Karthika',     'name_ml' => 'കാർത്തിക'],
            ['name_en' => 'Rohini',       'name_ml' => 'രോഹിണി'],
            ['name_en' => 'Magayiram',    'name_ml' => 'മകയിരം'],
            ['name_en' => 'Thiruvathira','name_ml' => 'തിരുവാതിര'],
            ['name_en' => 'Punartham',    'name_ml' => 'പുണർതം'],
            ['name_en' => 'Pooyam',       'name_ml' => 'പൂയ്യം'],
            ['name_en' => 'Aayillyam',    'name_ml' => 'ആയില്യം'],
            ['name_en' => 'Makam',        'name_ml' => 'മകം'],
            ['name_en' => 'Pooram',       'name_ml' => 'പൂരം'],
            ['name_en' => 'Uthram',       'name_ml' => 'ഉത്രം'],
            ['name_en' => 'Attham',       'name_ml' => 'അത്തം'],
            ['name_en' => 'Chithira',     'name_ml' => 'ചിത്തിര'],
            ['name_en' => 'Chothi',       'name_ml' => 'ചോതി'],
            ['name_en' => 'Vishakham',    'name_ml' => 'വിശാഖം'],
            ['name_en' => 'Anizham',      'name_ml' => 'അനിഴം'],
            ['name_en' => 'Thrikketta',   'name_ml' => 'തൃക്കേട്ട'],
            ['name_en' => 'Moolam',       'name_ml' => 'മൂലം'],
            ['name_en' => 'Pooradam',     'name_ml' => 'പൂരാടം'],
            ['name_en' => 'Uthradam',     'name_ml' => 'ഉത്രാടം'],
            ['name_en' => 'Thiruvonam',   'name_ml' => 'തിരുവോണം'],
            ['name_en' => 'Avittam',      'name_ml' => 'അവിട്ടം'],
            ['name_en' => 'Chathyam',     'name_ml' => 'ചതയം'],
            ['name_en' => 'Pooruttathi',  'name_ml' => 'പൂരൂട്ടാതി'],
            ['name_en' => 'Uthrattathi',  'name_ml' => 'ഉത്രട്ടാതി'],
            ['name_en' => 'Revati',       'name_ml' => 'രേവതി'],
        ]);

    }
}
