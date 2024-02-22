function get_element_by_id(elementID) {
    return document.getElementById(elementID);
}


function set_element_by_id(elementID, value) {
    document.getElementById(elementID).innerText = value;
}

let counter = 0;
let ticket_total = 0;
let check_arr = [];
let condition_arr = [];
let seat_items = document.getElementsByClassName('seat-btn');

function create_items(seatInner, ticketPrice) {
    let new_li = document.createElement("li");

    let p1 = document.createElement("p");
    p1.innerText = seatInner;
    let p2 = document.createElement("p");
    p2.innerText = "Economy";
    let p3 = document.createElement("p");
    p3.innerText = ticketPrice;

    new_li.appendChild(p1)
    new_li.appendChild(p2)
    new_li.appendChild(p3)
    get_element_by_id('ticket-selection').appendChild(new_li)
}

for (const seat of seat_items) {
    seat.addEventListener('click', function (e) {

        if (counter < 4) {
            if (check_arr.includes(seat)) {
                alert("You can only select one seat at a same time.")
                return;

            }
            else {
                counter += 1;
                ticket_total += parseInt(get_element_by_id('ticket-price').innerText);
                let seat_available = parseInt(get_element_by_id('available-seat').innerText);
                set_element_by_id('available-seat', seat_available - 1)
                set_element_by_id('total-price', ticket_total);
                set_element_by_id('grand-total', ticket_total);
                e.target.classList.add('bg-[#1DD100]')
                set_element_by_id('selected-seat', counter)
                create_items(seat.innerText, get_element_by_id('ticket-price').innerText);
            }
        }
        else {
            alert("You can only select maximum 4 seat.")
        }

        check_arr.push(seat);
    })
}

get_element_by_id('coupon-input').addEventListener('keyup', function () {
    let couponInput = get_element_by_id('coupon-input').value;
    if (couponInput !== '') {
        get_element_by_id('apply-btn').removeAttribute('disabled');

    }
})

function applyCoupon() {
    let couponInput = get_element_by_id('coupon-input').value;
    const coupon_1 = get_element_by_id("coupon-1").innerText;
    const coupon_2 = get_element_by_id("coupon-2").innerText;
    if (couponInput === coupon_1) {
        let discount1 = ticket_total * 0.15;
        set_element_by_id('grand-total', ticket_total - discount1);
        set_element_by_id('discount-price', discount1)
        get_element_by_id('input-field').classList.add("hidden");
        get_element_by_id('discount').classList.remove("hidden");
    }
    else if (couponInput === coupon_2) {
        let discount2 = ticket_total * 0.20;
        set_element_by_id('grand-total', ticket_total - discount2);
        set_element_by_id('discount-price', discount2)
        get_element_by_id('input-field').classList.add("hidden");
        get_element_by_id('discount').classList.remove("hidden");
    }
    else {
        alert("Your coupon is Invalid")
    }
}

get_element_by_id('submitInfo').addEventListener('keyup', function () {
    get_element_by_id('modalbutton').removeAttribute("disabled");
})

function reload() {
    location.reload()
}