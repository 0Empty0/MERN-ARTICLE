import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/Layout/Layout'
import MainPage from './pages/MainPage/MainPage'
import PostsPage from './pages/PostsPage/PostsPage'
import PostPage from './pages/PostPage/PostPage'
import AddPostPage from './pages/AddPostPage/AddPostPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import EditPostPage from './pages/EditPostPage/EditPostPage'
import LoginPage from './pages/LoginPage/LoginPage'
import { useDispatch } from 'react-redux'
import { getMe } from './store/features/auth/authSlice'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMe())
	}, [dispatch])

	return (
		<div className='wrapper'>
			<Layout>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/posts' element={<PostsPage />} />
					<Route path=':id' element={<PostPage />} />
					<Route path=':id/edit' element={<EditPostPage />} />
					<Route path='/new' element={<AddPostPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>

				<ToastContainer position='top-center' autoClose={3000} />
			</Layout>
		</div>
	)
}

export default App
