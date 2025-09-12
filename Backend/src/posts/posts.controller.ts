import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService, type Post as PostType } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): PostType[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): PostType {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() payload: Omit<PostType, 'id'>): PostType {
    return this.postsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Partial<Omit<PostType, 'id'>>,
  ) {
    return this.postsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }

  @Post('user/:userId')
  createForUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: Omit<PostType, 'id' | 'userId'>,
  ) {
    return this.postsService.create({ ...payload, userId });
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findByUser(userId);
  }
}
