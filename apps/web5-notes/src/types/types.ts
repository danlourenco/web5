export interface Note {
  data: string;
  id: string;
  record: {
    isDeleted: boolean;
    author: string;
    target: string;
  }
}