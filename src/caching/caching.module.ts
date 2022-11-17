import { CacheModule, Module } from '@nestjs/common';
import { CachingService } from './caching.service';

@Module({
  imports: [CacheModule.register()],
  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}
