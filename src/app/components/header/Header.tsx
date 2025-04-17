import Link from 'next/link'
import styles from "./header.module.css"
import Navbar from './Navbar'
import { cookies } from 'next/headers'
import { verifyTokenForPage } from '@/utils/verifyToken';
import Logout from './Logout';
export default function Header() {
  const token = cookies().get('jwtToken')?.value || '';
  const payload = verifyTokenForPage(token);
  return (
    <header className={styles.header}>
      <Navbar isAdmin={payload?.isAdmin || false} />
      <div className={styles.right}>
        {payload ? (
          <>
            <strong className='text-blue-800 md:text-xl capitalize'>{payload.username}</strong>
            <Logout />
          </>) : (<>
            <Link className={styles.btn} href="/login">Login</Link>
            <Link className={styles.btn} href="/register">Regsiter</Link>  </>)}
      </div>
    </header>
  )
}
