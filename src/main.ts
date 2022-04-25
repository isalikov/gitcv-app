import AppLoader from './app'
import { ping } from './api'

ping().then(AppLoader)
