import { Pipe, PipeTransform } from '@angular/core';
import { RentalDto } from '../models/rentaldto';

@Pipe({
  name: 'rental'
})
export class RentalPipe implements PipeTransform {

  transform(value: RentalDto[], filterText: string): RentalDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c: RentalDto) =>
            c.carName.toLocaleLowerCase().indexOf(filterText) !== -1 || c.customerName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }

}
