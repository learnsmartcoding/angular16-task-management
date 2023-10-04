export interface TasksDocument {
    id: string;
    taskId: string;
    userId: string;
    title: string;
    description: string;
    dueDate: string; // Change the type to string for date inputs
    status: string;
    priority: string;
    labels: string[];
    attachments: Attachment[];
    subtasks: Subtask[];
  }
  
  export interface Attachment {
    id: string;
    fileName: string;
    url: string;
  }
  
  export interface Subtask {
    id: string;
    title: string;
    status: string;
  }
  