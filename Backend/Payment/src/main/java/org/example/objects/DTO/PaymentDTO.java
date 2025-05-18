package org.example.objects.DTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PaymentDTO{

    private String id;
    private String formOfPayment;
    private String nameOfCustomer;
    private int totalProducts;
    private BigDecimal totalPrice;
    private boolean paid;

    public String getFormOfPayment() { return formOfPayment; }

    public String getNameOfCustomer() { return nameOfCustomer; }

    public String getId() { return id; }

    public int getTotalProducts() { return totalProducts; }

    public BigDecimal getTotalPrice() { return totalPrice; }

    public boolean isPaid() { return paid; }

    public void setFormOfPayment(String formOfPayment) { this.formOfPayment = formOfPayment; }

    public void setNameOfCustomer(String nameOfCustomer) { this.nameOfCustomer = nameOfCustomer; }

    public void setId(String id) { this.id = id; }

    public void setTotalProducts(int totalProducts) { this.totalProducts = totalProducts; }

    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public void setPaid(boolean paid) { this.paid = paid; }

}