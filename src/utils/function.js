export const getMessageFromError = (err) => ({
  message: err.response.data.meta && Object.keys(err.response.data.meta).length ? Object.values(err.response.data.meta)[0] : err.response.data.message
})

export const infiniteScrollMixin = {
  methods: {
    detectInfiniteScroll(element, loader, totalCount, dataLength, funCall, page, ...rest) {
      const $elems = document.querySelector(element)
      $elems.addEventListener('scroll', async () => {
        if ($elems.scrollTop + $elems.clientHeight >= $elems.scrollHeight && !loader) {
          page = page + 1
          await funCall(...rest, page)
        }
      })
    }
  }
}

export const backgrondScrollHandler = (stat) => {
  if (stat) {
    document.querySelector('body').classList.add('bg_scroll')
  } else {
    document.querySelector('body').classList.remove('bg_scroll')
  }
}
