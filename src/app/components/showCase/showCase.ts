import {Component} from "angular2/core";
import {Home} from "../home/home";
import {Detail} from "../detail/detail";

@Component({
	selector: "showcase",
	directives: [Home,Detail],
	templateUrl: "app/components/showCase/showCase.html"
})
export class ShowCase {

}