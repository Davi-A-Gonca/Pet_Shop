package org.example.objects;

import org.example.objects.DTO.PaymentDTO;

import java.math.BigDecimal;

public class Payment {

    private String id;
    private String formOfPayment;
    private String nameOfCustomer;
    private int totalProducts;
    private BigDecimal totalPrice;
    private boolean paid;

    public Payment(String id, String formOfPayment, String nameOfCustomer,
                   int totalProducts, BigDecimal totalPrice, boolean paid){
        this.id = id;
        this.formOfPayment = formOfPayment;
        this.nameOfCustomer = nameOfCustomer;
        this.totalProducts = totalProducts;
        this.totalPrice = totalPrice;
        this.paid = paid;
    }

    public Payment(PaymentDTO dto){
        id = dto.getId();
        formOfPayment = dto.getFormOfPayment();
        nameOfCustomer = dto.getNameOfCustomer();
        totalProducts = dto.getTotalProducts();
        totalPrice = dto.getTotalPrice();
        paid = dto.isPaid();
    }

    public Payment(){}

    public String getFormOfPayment() { return formOfPayment; }

    public String getNameOfCustomer() { return nameOfCustomer; }

    public int getTotalProducts() { return totalProducts; }

    public BigDecimal getTotalPrice() { return totalPrice; }

    public String getId() { return id; }

    public boolean isPaid() { return paid; }

    public void setFormOfPayment(String formOfPayment) { this.formOfPayment = formOfPayment; }

    public void setNameOfCustomer(String nameOfCustomer) { this.nameOfCustomer = nameOfCustomer; }

    public void setTotalProducts(int totalProducts) { this.totalProducts = totalProducts; }

    public void setId(String id) { this.id = id; }

    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public void setPaid(boolean paid) { this.paid = paid; }

}
