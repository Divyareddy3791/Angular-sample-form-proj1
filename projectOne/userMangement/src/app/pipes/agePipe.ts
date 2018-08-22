
import { Pipe, PipeTransform } from '@angular/core';
import { UserDataService } from './servies/user-data.service';

@Pipe({
    name: 'agePipe',
    pure: false
})

export class AgePipe implements PipeTransform {

    constructor() {}
    transform(items: any, args): any {
        let id = [...items];
        let age =0;let temp = `${id[0]}${id[1]}`;
        if(parseInt(temp) > 18) {
            for(let i=3;i<id.length;i++) {
                age += parseInt(id[i]);
            }
        }else {
            age = parseInt(id[7])+parseInt(id[8]);
        }
       
        return age.toString()
    }
       
}