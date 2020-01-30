import uuid from 'uuid/v4'
import * as yup from 'yup'
type UserCreateParams = {
    name: string;
    age: number;
}

type User = {
    id: string;
    name: string;
    age: number;
}

const createUserSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    age: yup
        .number()
        .required()
        .positive()
        .integer()
});

class UserService {
    private store: Map<string, User>;

    constructor() {
        this.store = new Map();
    }

    async create(params: UserCreateParams): Promise<User> {
        const { name, age } = params;
        
        const id = uuid();
        const user: User = {
            id,
            name,
            age
        }
        await createUserSchema.validate(user, { strict: true});
        
        this.store.set(id, user);
        return user;
    }

    get() {

    }

    getList() {
        
    }

    update() {

    }

    delete() {

    }

}

export default UserService;