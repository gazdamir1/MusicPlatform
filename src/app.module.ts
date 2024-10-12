import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.bwzax.mongodb.net/music-platform?retryWrites=true&w=majority&appName=Cluster0',
    ),
    TrackModule,
  ],
})
export class AppModule {}
