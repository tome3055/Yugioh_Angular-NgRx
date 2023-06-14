export interface CurrentUserInterface {
    id: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    username: string,
    bio: string | null,
    image: string | null,
    token: string
}