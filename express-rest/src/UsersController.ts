export interface User{
  id: string,
  name: string,
  age: number
}

export class UsersController{

  private users: Map<string, User> = new Map<string, User>();

  getUser(id: string): User|undefined{
    return this.users.get(id);
  }

  getAllUsers(): User[]{
    const usersArray: User[] = [];
    this.users.forEach( (user: User) => usersArray.push(user));
    return usersArray;
  }

  deleteUser(id: string): boolean{
    return this.users.delete(id);
  }

  addUser(user: User): boolean{
    if(this.users.has(user.id)) return false;
    this.users.set(user.id, user);
    return true;
  }

}
