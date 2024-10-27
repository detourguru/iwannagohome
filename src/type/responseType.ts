export type BaseStory = {
  id: number;
  story_id: string;
  character: string;
  story: string;
  init: string;
  personality: string;
  image_src: string;
  story_info: {
    alt: string;
    title: string;
    difficulty: string;
  };
};
