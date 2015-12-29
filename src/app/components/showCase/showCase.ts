import {Component} from "angular2/core";
import {Home} from "../home/home";
import {Detail} from "../detail/detail";

@Component({
    selector: "showcase",
    moduleId: module.id,
    directives: [Home, Detail],
    templateUrl: "showCase.html",
    styleUrls: ["style.css"]
})
export class ShowCase {

    title = "ShowCase";

    ngOnInit() {
        this.title = "ShowCase";
    }


}