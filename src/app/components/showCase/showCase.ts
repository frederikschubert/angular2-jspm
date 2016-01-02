import {Component} from "angular2/core";
import {Home} from "../home/home";
import {Detail} from "../detail/detail";

@Component({
    selector: "showcase",
    directives: [Home, Detail],
    templateUrl: "app/components/showCase/showCase.html",
    styleUrls: ["app/components/showCase/style.css"],
    host: ShowCase.styles
})
export class ShowCase {

    title = "ShowCase";
    static styles;

    ngOnInit() {
        this.title = "ShowCase";
        ShowCase.styles = {
            "color": "red"
        };
    }


}