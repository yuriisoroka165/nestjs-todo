import { Injectable } from "@nestjs/common";

@Injectable()
export class TodosService {
    findAll() {
        return [
            { id: 1, title: "Learn NestJS", completed: false },
            { id: 2, title: "Build a TODO app", completed: false },
        ];
    }
}
