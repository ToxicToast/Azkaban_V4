import { Controller } from '@nestjs/common';
import { ControllerHelper } from '@azkaban/shared';

@Controller(ControllerHelper('character'))
export class CharactersController {}
