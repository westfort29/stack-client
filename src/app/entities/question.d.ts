export interface IQuestion {
  tags: string[];
  owner: IOwner;
  question_id: number;
  title: string;
  answer_count: number;
}

export interface IOwner {
  reputation: number;
  user_type: string;
  display_name: string;
  profile_image: string;
  user_id: number;
}
