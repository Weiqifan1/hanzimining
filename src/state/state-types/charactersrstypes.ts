

export interface Content {
    number: number;
    character: string;
    keyword: string;
    story: string;
    dateOfLastReview: string;
    reviewValue: number;
}

export interface CharactersSRS {
    characterset: string;
    content: Content[];
}