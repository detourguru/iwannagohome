export type BaseStory = {
  id: number;
  story_id: string;

  story: string;
  personality: string;
  story_info: {
    alt: string;
    title: string;
    difficulty: string;
    character: string;
    init: string;
    image_src: string;
  };
};
