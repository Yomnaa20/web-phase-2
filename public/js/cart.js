document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('apply-coupon').addEventListener('click', function() {
        const couponCode = document.getElementById('coupon-code').value;
        applyDiscount(couponCode);
    });

    function applyDiscount(couponCode) {
        const validCoupon = 'DISCOUNT5';  // Example valid coupon code
        const discountRate = 0.05;  // 5% discount
        const totalElement = document.getElementById('cart-total');
        const successMessageElement = document.getElementById('success-message');
        let totalText = totalElement.textContent;
        let totalPrice = parseFloat(totalText.replace('Total: £', '').replace(',', ''));

        if (couponCode === validCoupon) {
            const discountAmount = totalPrice * discountRate;
            const newPrice = totalPrice - discountAmount;
            totalElement.innerHTML = `Total: <strong>£${newPrice.toFixed(2)}</strong>`;
            successMessageElement.textContent = `Coupon applied! You saved £${discountAmount.toFixed(2)}.`;
            successMessageElement.style.display = 'block';
            console.log("Coupon applied successfully.");
        } else {
            alert('Invalid coupon code.');
            console.log("Invalid coupon code.");
        }
    }


    function removeFromCart(element) {
        const cartItem = element.closest('.cart-item');
        
        if (cartItem) {
            cartItem.remove();
            
            // Update the cart details
            updateCart();
        }
    }

    function updateCart() {
        const cartItems = document.querySelectorAll('.cart-item');
        const cartCount = cartItems.length;
       
        document.getElementById('cart-count').textContent = `${cartCount} Course${cartCount !== 1 ? 's' : ''} in Cart`;

        const totalPrice = calculateTotal();
        document.getElementById('cart-total').innerHTML = `Total: <strong>£${totalPrice.toFixed(2)}</strong>`;

        const emptyCartMessage = document.getElementById('empty-cart-message');
        if (cartCount === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
        }
        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                removeFromCart(button);
            });
        });
    }
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(button);
        });
    });

    // Initial update of cart
   
    document.addEventListener('DOMContentLoaded', function() {
        const addToCartButton = document.querySelector('.add-to-cart');
    
        addToCartButton.addEventListener('click', function() {
            const courseContainer = document.getElementById('course-container');
            addToCart(courseContainer);
        });
    
        function addToCart(course) {
            // Example: Store the course details in localStorage
            const courseDetails = {
                title: course.querySelector('h1 strong').textContent,
                price: course.querySelector('.price-box p:nth-child(3)').textContent,
                image: course.querySelector('img').src
            };
    
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(courseDetails);
            localStorage.setItem('cart', JSON.stringify(cart));
    
            alert('Course added to cart!');
            console.log('Course added to cart:', courseDetails);
        }
    });
    updateCart();
    

   
});
