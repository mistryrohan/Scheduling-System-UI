import { redirect } from 'next/navigation';
export default async function Home() {
    
    // logout logic here
    
    redirect('/');
}