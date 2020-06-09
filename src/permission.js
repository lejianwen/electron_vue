import router from './router'
import store from './store'
import setting from './settings'
const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = setting.title

  // determine whether the user has logged in
  const hasToken = store.state.user.token

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})
