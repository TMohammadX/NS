export interface Design {
    id: string;
    user_id: string;
    design_prompt: string;
    generated_image_base64: string;
    mockup_text: string;
    product_title: string;
    product_description: string;
    created_at: string;
}

export interface ListingResponse {
    productTitle: string;
    productDescription: string;
}
