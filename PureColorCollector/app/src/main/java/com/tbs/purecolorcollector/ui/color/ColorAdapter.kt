package com.tbs.purecolorcollector.ui.color

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView

/**
 * author jingting
 * date : 2021/11/233:05 下午
 */

class PaymentAdapter(private val paymentList: List<PaymentBean>) : RecyclerView.Adapter<PaymentAdapter.PaymentHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PaymentHolder {
        val itemBinding = RowPaymentBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return PaymentHolder(itemBinding)
    }

    override fun onBindViewHolder(holder: PaymentHolder, position: Int) {
        val paymentBean: PaymentBean = paymentList[position]
        holder.bind(paymentBean)
    }

    override fun getItemCount(): Int = paymentList.size

    class PaymentHolder(private val itemBinding: RowPaymentBinding) : RecyclerView.ViewHolder(itemBinding.root) {
        fun bind(paymentBean: PaymentBean) {
            itemBinding.tvPaymentInvoiceNumber.text = paymentBean.invoiceNumber
            itemBinding.tvPaymentAmount.text = paymentBean.totalAmount
        }
    }
}
