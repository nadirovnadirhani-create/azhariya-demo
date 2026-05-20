import QuizPageClient from './QuizPageClient';
import { lessons } from '@/data/lessons';

export async function generateStaticParams() {
  return lessons.map((l) => ({
    id: l.id.toString(),
  }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  return <QuizPageClient params={props.params} />;
}
