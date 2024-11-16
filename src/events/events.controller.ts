// event.controller.ts
import { Controller, Get, Post, Param, Body, Put, Delete, Patch, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto'; 
import { UpdateEventDto } from './dto/update-event.dto'; 
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';
import { RolesGuard } from 'src/auth/role-gaurd';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';


@UseGuards(AuthGuardJwt, RolesGuard)
@Controller('api/events')
export class EventController {
  constructor(private readonly eventsService: EventsService) {}
  
  @Roles(Role.Admin)
  @Post()
  createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.createEvent(createEventDto);
  }


  @Get()
  getAllEvents(): Promise<Event[]> {
    return this.eventsService.getAllEvents();
  }

  @Get(':id')
  getEventById(@Param('id',ParseIntPipe) id: number): Promise<Event> {
    return this.eventsService.getEventById(id);
  }

  
  @Roles(Role.Admin)
  @Patch(':id')
  updateEvent(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  deleteEvent(@Param('id') id: number): Promise<void> {
    return this.eventsService.deleteEvent(id)
  }
}
