import { Paginate } from '../../../common/interfaces/paginate.interface';
import { UserDto } from '../dto/user.dto';

export interface PaginatedUsers {
  data: UserDto[];
  metadata: Paginate;
}
