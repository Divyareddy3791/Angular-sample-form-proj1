
import { Pipe, PipeTransform } from '@angular/core';
import { UserDataService } from './servies/user-data.service';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    constructor() {}
    transform(items: any[], args): any {
        console.log(items,args);
        if(args) {
            return items.filter(x =>  x.user.toLowerCase().includes(args.toLowerCase())  || x.gender.toLowerCase().includes(args.toLowerCase()) || x.idnumber.includes(args) )
        } else {
            return items
        }
        }
       
}