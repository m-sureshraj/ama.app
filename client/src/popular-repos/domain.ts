export interface Repo {
    id: string;
    owner: {
        id: string;
        login: string;
        name?: string;
        avatarUrl: string;
        bio?: string;
    };
    repository: {
        id: string;
        name: string;
    };
}
