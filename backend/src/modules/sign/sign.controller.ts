import { Controller } from "@nestjs/common";
import { SignService } from "./sign.service";

@Controller("sign")
export class SignController {
    constructor(private readonly signService: SignService) { }

}