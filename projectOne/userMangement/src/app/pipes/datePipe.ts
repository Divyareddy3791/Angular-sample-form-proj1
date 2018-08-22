
import { Pipe, PipeTransform } from '@angular/core';
import { UserDataService } from './servies/user-data.service';

@Pipe({
    name: 'datePipe',
    pure: false
})

export class DatePipe implements PipeTransform {
    public  MonthList =[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    constructor() {}
    transform(items: any, args): any {
        let id = [...items];
        let year;let temp = `${id[0]}${id[1]}`;
        parseInt(temp) > 18? year = `19${temp}`: year = `20${temp}`;
        let month = parseInt(`${id[2]}${id[3]}`);
        let day = `${id[4]}${id[5]}`;
        console.log(month,day,year)
        return (`${day} ${this.MonthList[month-1]} ${year}`)
    }
       
}