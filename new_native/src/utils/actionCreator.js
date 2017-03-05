export const actionNames = (baseName) => (
  {
    request: `${baseName}_REQUEST`,
    failure: `${baseName}_FAILURE`,
    success: `${baseName}_SUCCESS`
  }
)

export const buildActions = (actionName) => ({
  request: () => ({
    type: actionName.request
  }),
  failure: (error) => ({
    type: actionName.failure,
    error
  }),
  success: (data) => ({
    type: actionName.success,
    data
  })
})
