export const consumerGiftPayments = {
  data: [
    {
      txn_id: 1,
      amount: 100,
      gift_status: true,
      payment_status: false,
      retry_status: false,
      created_at: "2019-01-01T20:34:05+05:30"
    },
    {
      txn_id: 2,
      amount: 1000,
      gift_status: true,
      payment_status: false,
      retry_status: true,
      created_at: "2019-01-01T20:34:05+05:30"
    },
    {
      txn_id: 3,
      amount: 10000,
      gift_status: true,
      payment_status: false,
      retry_status: false,
      created_at: "2019-01-01T20:34:05+05:30"
    }
  ],
  count: 100
}

export const consumerRewardsData = {
  data: [
    {
      reward_id: 1,
      reward_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "processed"
    },
    {
      reward_id: 2,
      reward_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "pending"
    },
    {
      reward_id: 3,
      reward_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "pending"
    },
    {
      reward_id: 4,
      reward_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "processed"
    }
  ],
  count: 10
}

export const NodalTransactionData = {
  data: [
    {
      trans_id: 1,
      trans_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "processed"
    },
    {
      trans_id: 2,
      trans_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "pending"
    },
    {
      trans_id: 3,
      trans_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "pending"
    },
    {
      trans_id: 4,
      trans_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "processed"
    }
  ],
  count: 10
}

export const paymentData = {
  data: [
    {
      payment_id: 1,
      payment_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "processed"
    },
    {
      payment_id: 2,
      payment_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "pending"
    },
    {
      payment_id: 3,
      payment_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "pending"
    },
    {
      payment_id: 4,
      payment_amount: 100,
      order_id: 123,
      retailer_name: "test",
      status: "processed"
    }
  ],
  count: 10
}