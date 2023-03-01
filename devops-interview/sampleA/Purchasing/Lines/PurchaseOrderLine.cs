[DataContract]
public class PurchaseOrderLine
{
    public Product Product { get; set; }
    public PurchaseOrder Order { get; set; }
    public decimal Quantity { get; set; }
}