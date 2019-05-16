<template>
  <div class="settings-right">
    <div class="info-order" v-if="order">
      <h3>Детали заказа</h3>
      <div class="card-box">
        <div class="panel-body">
          <div class="clearfix">
            <div class="pull-left">
              <h4 class="text-right">
                <img
                  width="125px"
                  src="https://flatris.com.ua/assets/images/logo/logo_full.svg"
                  alt="velonic"
                >
              </h4>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-12">
              <div class="pull-left m-t-30">
                <address>
                  <strong>FLATRIS</strong>
                  <br>г. Киев, пр. Глушкова 13Б
                  <br>Украина, 03187
                  <br>
                  <abbr>Тел.:</abbr> +38 044 227-07-68
                </address>
              </div>
              <div class="pull-right m-t-30">
                <p>
                  <strong>Дата заказа:</strong>
                  {{order.createdon}}
                </p>
                <p class="m-t-10">
                  <strong>Статус:</strong>
                  <span
                    class="label"
                    :class="{'label-success': ['success', 'sandbox'].includes(order.status),
                'label-warning': !['failure', 'error', 'success'].includes(order.status) && order.status,
                'label-danger': ['failure', 'error'].includes(order.status) || !order.status }"
                  >{{setStatus(order.status)}}</span>
                </p>
                <p class="m-t-10">
                  <strong>Заказ:</strong>
                  №{{order.id}}
                </p>
              </div>
            </div>
          </div>
          <div class="m-h-50"></div>
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table m-t-30">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Услуга</th>
                      <th>Дата</th>
                      <th>Сумма</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{order.tariff_id}}</td>
                      <td>{{order.description}}</td>
                      <td>{{order.createdon}}</td>
                      <td>{{Number_format(order.amount)}} {{order.currency}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col-md-3">
              <h3 class="text-right">{{Number_format(order.amount)}} {{order.currency}}</h3>
            </div>
          </div>
          <hr>
          <div class="d-print-none">
            <div class="text-right">
              <a
                href="#"
                @click.prevent="order = null"
                class="btn btn-white waves-effect waves-light float-left"
              >
                <span class="btn-label">
                  <i class="fa fa-arrow-left"></i>
                </span>Назад
              </a>
              <a href="javascript:window.print()" class="btn btn-inverse waves-effect waves-light">
                <span class="btn-label">
                  <i class="fa fa-print"></i>
                </span>Печатать
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="settings-btns">
        <h3>Ваш тарифный план</h3>
        <div class="order-mob-btns text-center">
          <router-link
            :to="{ name: 'settings', params: { id: 'tarif' }, query: {step: 2}}"
            class="btn btn-line btn-md waves-effect"
          >Продлить</router-link>
          <router-link
            :to="{ name: 'settings', params: { id: 'tarif' }}"
            class="btn btn-md btn-or waves-effect"
          >Изменить</router-link>
        </div>
      </div>

      <div class="row tarif-list" v-if="$store.state.tariff.code">
        <div class="col-lg-3">
          <div class="t">Тариф</div>
          <div class="item" style="text-transform: uppercase;">{{$store.state.tariff.code}}</div>
        </div>
        <div class="col-lg-3">
          <div class="t">Период</div>
          <div
            class="item"
          >{{$store.state.tariff.period}} {{Declension($store.state.tariff.period, ['месяц', 'месяца', 'месяцев'] )}}</div>
        </div>
        <div class="col-lg-3">
          <div class="t">Дата начала периода</div>
          <div class="item">{{$store.state.account.c_date}}</div>
        </div>
        <div class="col-lg-3">
          <div class="t">Дата окончания периода</div>
          <div class="item">{{adate.day}}.{{adate.month}}.{{adate.year}}</div>
        </div>
        <div class="col-lg-3">
          <div class="t">Добавлено объектов</div>
          <div class="item">{{$store.state.account.gprojects_total}}</div>
        </div>
        <div class="col-lg-3">
          <div class="t">Добавлено квартир</div>
          <div
            class="item"
          >{{$store.state.account.flats_total}} из {{$store.state.account.flats_limit}}</div>
        </div>
        <div class="col-lg-3">
          <div class="t">Создано каталогов для сайта</div>
          <div class="item">1 из {{$store.state.tariff.web_access}}</div>
        </div>
      </div>

      <h3>Ваши платежи</h3>
      <div class="table-responsive permissions-table">
        <table class="table table-actions-bar">
          <thead>
            <tr>
              <th>Услуга</th>
              <th>Дата</th>
              <th>Заказ</th>
              <th>Статус</th>
              <th>Сумма</th>
              <!-- <th style="min-width: 80px;" class="text-center">Детали</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in orders" :key="i">
              <td>{{item.description}}</td>
              <td>{{item.createdon}}</td>
              <td>
                <a href="#" @click.prevent="order = item">№{{item.id}}</a>
              </td>
              <td>
                <span
                  class="label"
                  :class="{'label-success': ['success', 'sandbox'].includes(item.status),
                'label-warning': !['failure', 'error', 'success'].includes(item.status) && item.status,
                'label-danger': ['failure', 'error'].includes(item.status) || !item.status }"
                >{{setStatus(item.status)}}</span>
              </td>
              <td>{{Number_format(item.amount)}} {{item.currency}}</td>
              <!-- <td class="text-center">
                <div class="more-dots" @click="order = item">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </td>-->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "orders",
  mixins: [settings],
  data() {
    return {
      order: null
    };
  },

  created() {
    if (!this.$store.state.tariff.gprojects_total) {
      this.$store.commit("getTarifPlan");
    }
    if (!this.$store.state.orders) {
      this.$store.commit("getOrders");
    }
  },

  mounted() {},
  computed: {
    adate() {
      if (!this.$store.state.account.end_date) return;
      let date1 = this.formatDate(this.$store.state.account.end_date);

      return date1;
    },
    orders() {
      if (!this.$store.state.orders) return {};
      return this.lodash.orderBy(this.$store.state.orders, "id", "desc");
    }
  },
  methods: {
    formatDate(adate) {
      if (!adate) return;
      adate = new Date(adate);

      let out = {
        day: adate.getDate(),
        month: adate.getMonth() + 1,
        year: adate.getFullYear()
      };

      if (out.day < 10) {
        out.day = "0" + out.day;
      }
      if (out.month < 10) {
        out.month = "0" + out.month;
      }

      return out;
    },
    setStatus(status) {
      if (!["failure", "error", "success"].includes(status) && status) {
        return "Ошибка оплаты";
      }
      if (["failure", "error"].includes(status) || !status) {
        return "Отменен";
      }
      if (["success", "sandbox"].includes(status)) {
        return "Успешно оплачен";
      }
    },
    send(data) {
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss" scoped>
.tarif-list {
  margin-right: -10px !important;
  margin-left: -10px !important;
  font-size: 14px;
  margin-bottom: 50px;
  > div {
    padding-left: 10px !important;
    padding-right: 10px !important;
    margin-bottom: 15px;
  }
  .t {
    margin-bottom: 10px;
    padding-left: 10px;
  }
  .item {
    padding: 12px;
    border-radius: 12px;
    background: #e6f0f6;
    text-align: center;
  }
}

.info-order {
  .label {
    margin-left: 5px;
  }
}

.order-mob-btns {
  .btn {
    margin: 0 10px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

@media print {
  .heading,
  .main-header,
  .wrap-left-nav {
    display: none !important;
  }
  .settings-content {
    max-width: 100% !important;
    flex: none;
  }
}

@media (max-width: 991px) {
  .pull-right,
  .pull-left {
    float: none;
  }
  .m-h-50 {
    display: none;
  }
  .tarif-list {
    margin-bottom: 30px;
  }
  .order-mob-btns {
    margin-bottom: 30px;
  }

  .permissions-table {
    border: 4px solid #ebf2f7;
    margin-left: -15px;
    margin-right: -15px;
    width: auto;
    .table {
      min-width: 700px;
      font-size: 12px;
    }
  }
}
</style>
