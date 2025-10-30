import { JSONStructureDefinition } from "@/Components/DataLoader/SetDataStructure/useJsonStructure";
import { JsonFieldMapping } from "@/Components/DataLoader/useJsonFieldMapping";
import {
    MetaData,
    MetaHierarchy,
    MetaStructure,
} from "@/interfaces/meta_interfaces";

export interface Model {
    id: number;
    created_at?: string | null;
    updated_at?: string | null;
    created_by?: number | null;
    updated_by?: number | null;
}

export interface User extends Model {
    name: string;
    email: string;
    role?: string;
    office_code?: string;
}

export interface Product extends Model {
    id: number;
    name: string;
    sku: string;
    slug: string;
    description: string;
    price_sell: number;
    price_buy: number;
    stock: number;
    category_id: number;
    brand_id: number;
    status: number;
}

export interface Customer extends Model {
    id: number;
    name: string;
    username?: string;
    full_name?: string;
    email: string;
    phone: string;
    address: string;
    address_line1?: string;
    address_line2?: string; 
    city: string;
    state: string;
    country: string;
    pincode: string;
    delivery_instructions?: string;
    status: number;
}

