import iView from 'iview';
import locale from 'iview/dist/locale/en-US'; // Change locale, check node_modules/iview/dist/locale
import Vue from 'vue';
import { mapGetters } from 'vuex'

Vue.use(iView, {
  locale
})


// mixins for using common methods

Vue.mixin({
    filters:{
        toFixedNum(num){
          if(num) return num.toFixed(2)
          return 0;
        },
        fixedPaymentType(value){
                if(value == 'sslcommerz') return "SSL Commerz Secure Payment";
                else return value;
        },
        disountPrice(item){
            let price = parseInt(item.sellingPrice)
            price = price - ((parseInt(item.discount)*price)/100)
            return price
        },
        dateFixed(cd){
            let d = new Date(cd);
            let monthNumber = d.getMonth()+1
            monthNumber = ("0" + monthNumber).slice(-2);
            let dayNumber = d.getDate()
            dayNumber = ("0" + dayNumber).slice(-2);
            let today = `${dayNumber}-${monthNumber}-${d.getFullYear()}`
            return today
        }

      },
    computed:{
        ...mapGetters({
            cartItem:'getCartItem',
            order: 'order',
            callCartOb:'getCallCartOb',
            callWishListOb:'getCallWishListOb',
        })
    },
    methods: {
        i(msg, i = 'Hey!') {
            this.$Notice.info({
                title: i,
                desc: msg
            });
        },
        s(msg, i = 'Great!') {
            this.$Notice.success({
                title: i,
                desc: msg
            });
        },
        w(msg, i = 'Hi!') {
            this.$Notice.warning({
                title: i,
                desc: msg
            });
        },
        e(msg, i = 'Oops!') {
            this.$Notice.error({
                title: i,
                desc: msg,

            });
        },
        swr() {
            this.$Notice.error({
                title: 'Oops',
                desc: 'Something went wrong, please try again later'
            });
        },
        removeAll(){
            // this.$ls.set('myCart', [])
            this.$store.commit('removeAll',[])
        },
        async getCartItemsServer(){
            const res = await this.callApi('get',`/app/get_cart?userId=${this.authUser.id}`)
            if(res.status == 200){
                this.$store.dispatch('updateCart', res.data.allCarts)
                this.$store.state.order.invoiceTotal = res.data.total
            }
            else {
                this.swr();
            }
        },
        async addToCartServer(p,qu=1){
            console.log('Quantity',qu);
            console.log('product',p);
            if(!this.authUser){
                p.quantity=qu;
                this.$store.commit('setCallCartOb',p)
                this.i("Please login to cart the product!")
                this.$router.push('/signIn')
                return
            }
            if(qu > p.stock){
              return this.i("Product Stock Out!")
            }
            let cartItem = this.cartItem
            for(let i in cartItem){
              if(cartItem[i].productId===p.id){
                  let tq = parseInt(cartItem[i].quantity) + parseInt(qu) ;
                  if(p.stock< tq) {

                      this.i('Product Out of Stock!!');
                      return false;
                  }
              }
            }
            p.quantity=qu;

            const res = await this.callApi("post",'/app/add_cart',p)
            if(res.status == 200){
              this.$store.commit('updateCart', res.data.allCarts);
              console.log(this.cartItem);
              if(res.data.isNew) this.s('Item added to cart.');
              else this.s('Product Quantity increased  in cart ');
            }
            else if (res.status == 401){
              this.e(res.data.message)
            }
            else {
              this.swr();
            }


            return true;

        },
        async removeItemServer(id,index){
            const res = await this.callApi('post','app/remove_cart',{id:id})
            if(res.status == 200){
              let cartItem = this.cartItem
              cartItem.splice(index,1);
              this.$store.dispatch('updateCart', cartItem)

            }
            else {
              this.swr();
            }
        }
    }
})

