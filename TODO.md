# Task: Fix Product Card Navigation Issues

## Issues to Fix:
1. Product detail page opens from middle instead of top
2. Home navigation doesn't work properly after clicking product cards

## Plan:
1. Fix scroll-to-top functionality in Landing.jsx and Shop.jsx
2. Fix home navigation to use React Router instead of just clearing local state
3. Test the navigation and scrolling behavior

## Steps:
- [ ] Add scroll-to-top functionality to Landing.jsx when product detail renders
- [ ] Fix scroll-to-top in Shop.jsx to ensure it works properly
- [ ] Update home navigation in both components to use React Router's useNavigate
- [ ] Test navigation flow from Landing → Product Detail → Home
- [ ] Test navigation flow from Shop → Product Detail → Home
- [ ] Verify scroll-to-top works properly
