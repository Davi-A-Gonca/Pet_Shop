package org.example.objects.DTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
public class PaymentDTO{

    private UUID id;
    private String formOfPayment;
    private String nameOfCustomer;
    private int totalProducts;
    private BigDecimal totalPrice;
    private boolean paid;

    public String getFormOfPayment() { return formOfPayment; }

    public String getNameOfCustomer() { return nameOfCustomer; }

    public UUID getId() { return id; }

    public int getTotalProducts() { return totalProducts; }

    public BigDecimal getTotalPrice() { return totalPrice; }

    public boolean isPaid() { return paid; }

    public void setFormOfPayment(String formOfPayment) { this.formOfPayment = formOfPayment; }

    public void setNameOfCustomer(String nameOfCustomer) { this.nameOfCustomer = nameOfCustomer; }

    public void setId(UUID id) { this.id = id; }

    public void setTotalProducts(int totalProducts) { this.totalProducts = totalProducts; }

    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public void setPaid(boolean paid) { this.paid = paid; }

}