import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync } from 'fs';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private nextId = 1;

  constructor() {
    try {
      const filePath = __dirname + '/../../src/data/posts.json';
      const raw = readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw) as Post[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        this.posts = parsed;
        this.nextId =
          (this.posts.reduce((max, p) => Math.max(max, p.id), 0) || 0) + 1;
      }
    } catch (err) {
      console.warn('Could not load posts.json, starting with empty posts', err);
    }
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const p = this.posts.find((x) => x.id === id);
    if (!p) throw new NotFoundException(`Post ${id} not found`);
    return p;
  }

  findByUser(userId: number): Post[] {
    return this.posts.filter((p) => p.userId === userId);
  }

  create(partial: Omit<Post, 'id'>): Post {
    const newPost: Post = { id: this.nextId++, ...partial };
    this.posts.unshift(newPost);
    return newPost;
  }

  update(id: number, patch: Partial<Omit<Post, 'id'>>): Post {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx === -1) throw new NotFoundException(`Post ${id} not found`);
    this.posts[idx] = { ...this.posts[idx], ...patch };
    return this.posts[idx];
  }

  remove(id: number): { removed: boolean } {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx === -1) throw new NotFoundException(`Post ${id} not found`);
    this.posts.splice(idx, 1);
    return { removed: true };
  }
}
