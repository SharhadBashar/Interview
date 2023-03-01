import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;

public class OrderMouse {
	
	//Main function that gets user input and calls function to purchase item. Displays final result
	//Input: args[], containing item name for purchase (currently hard coded
	//Output: confirmation of purchase success or failure
	public static void main(String[] args) throws IOException, InterruptedException {
		final String textToFind = "Copyright © Splashing Pixels, All Rights Reserved";
		final String directory = System.getProperty("user.dir");
		//String item = args[0];
		String item = "Magic Mouse";
		boolean purchased = purchase (item, textToFind, directory);
		if (purchased) {
			System.out.println("Purchase of " + item + " successful. Please verify purchase records in screenshot directory and check email to pay for item");
		}
		else {
			System.out.println("Purchase unsuccessful. Please check console for more info on the error");
		}
	}
	
	//Function that opens chrome, navigates to site, and purchases one item and takes screenshot of confirmation
	//Input: item: item name
	//		 textToFind: HTML text to make sure page has loaded
	//		 directory: directory of project
	//Output: boolean identifying if purchase was successful or not
	public static boolean purchase(String item, String textToFind, String directory) throws IOException, InterruptedException {
		String text, itemName = null;
		int count = 0;
		
		System.setProperty("webdriver.chrome.driver", directory + "\\driver\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		/*
		Using Firefox:
		System.setProperty("webdriver.firefox.marionette", directory + "\\driver\\geckodriver.exe);
		WebDriver driver = new FirefoxDriver();
		
		Using Internet Explorer:
		System.setProperty("webdriver.ie.driver", directory + "\\driver\\MicrosoftWebDriver.exe");		
		DesiredCapabilities caps = DesiredCapabilities.internetExplorer();
		caps.setCapability("ignoreZoomSetting", true);		
		@SuppressWarnings("deprecation")
		WebDriver driver = new InternetExplorerDriver(caps);
		*/
		
		driver.get("http://store.demoqa.com/");
		driver.manage().window().maximize();
		pageLoadCheck(driver, textToFind);
		
		WebElement element = driver.findElement(By.xpath("//*[@id=\"menu-item-33\"]/a")); 
        Actions action = new Actions(driver);
        action.moveToElement(element).build().perform();
        Thread.sleep(1000);
        
        click(driver, "//*[@id=\"menu-item-34\"]");

        pageLoadCheck(driver, textToFind);
        
        text = getText(driver, "//*[@id=\"content\"]");
        int items = numItems(text);
        for (int i = 3; i <= items; i++) {
        	itemName = getText(driver, String.format("//*[@id=\"default_products_page_container\"]/div[%d]/div[2]/h2/a", i));
        	if (itemName.toLowerCase().equals(item.toLowerCase())) {
        		click(driver, String.format("//*[@id=\"default_products_page_container\"]/div[%d]/div[2]/form/div[2]/div[1]/span/input", i));
        		break;
        	}
        }
        while(count != 1) {
        	count = Integer.parseInt(getText(driver, "//*[@id=\"header_cart\"]/a/em[1]"));
        	if(count > 1) {
        		System.out.println("More than one item bought. Cannot afford");
        		Thread.sleep(5000);
        		driver.close();
        		return false;
        	}
        }

        click(driver, "//*[@id=\"header_cart\"]");
        pageLoadCheck(driver, textToFind);
        
        click(driver, "//*[@id=\"checkout_page_container\"]/div[1]/a");
        pageLoadCheck(driver, textToFind);

        enterText(driver, "//*[@id=\"wpsc_checkout_form_9\"]", "sharhadsadid@yahoo.com");
        enterText(driver, "//*[@id=\"wpsc_checkout_form_2\"]", "Sharhad");
        enterText(driver, "//*[@id=\"wpsc_checkout_form_3\"]", "Bashar");
        enterText(driver, "//*[@id=\"wpsc_checkout_form_4\"]", "Address");
        enterText(driver, "//*[@id=\"wpsc_checkout_form_5\"]", "Toronto");
        enterText(driver, "//*[@id=\"wpsc_checkout_form_6\"]", "Ontario");
        enterText(driver, "//*[@id=\"wpsc_checkout_form_8\"]", "N6H4P4");
        enterText(driver, "//*[@id=\"wpsc_checkout_form_18\"]", "514-831-4745");
        selectDropDown(driver, "//*[@id=\"wpsc_checkout_form_7\"]", "Canada");
        click(driver, "//*[@id=\"shippingSameBilling\"]");
        click(driver,"//*[@id=\"wpsc_shopping_cart_container\"]/form/div[4]/div/div/span/input");
        
        if(getText(driver, "//*[@id=\"post-30\"]/div").contains("Thank you, your purchase is pending")){
        	screenShot(driver, directory);
        	Thread.sleep(5000);
            driver.close();
        	return true;
        }
        Thread.sleep(5000);
		driver.close();
		return false;

	}
	
	//Function that counts number of items in a list
	//Input: text: contains HTML text
	//Output: num of items in a list
	public static int numItems (String text) {
		String[] split = text.split("\\n");
		int items = 0;
		for(int i = 0; i < split.length; i++) {
			if (split[i].contains("You save")) {
				items++;
			}
		}
		return items;
	}
	
	//Function that clicks a button or link
	//Input: driver: Browser driver
	//		 xPath: xpath of item
	//OutPut: void
	public static void click (WebDriver driver, String xPath) {
		try {
			driver.findElement(By.xpath(xPath)).click();
			Thread.sleep(1000);
		}
		catch(Exception e) {
			System.out.println("Error Clicking item with xpath: " + xPath);
			System.out.println(e);
		}
	}
	
	//Function that gets the text of an HTML item
	//Input: driver: Browser driver
	//		 xPath: xpath of item
	//OutPut: text value of item
	public static String getText (WebDriver driver, String xPath) {
		String text = null;
		try {
			text = driver.findElement(By.xpath(xPath)).getText();
		}
		catch(Exception e) {
			System.out.println("Error Getting Text of item with xpath: " + xPath);
			System.out.println(e);
		}
		return text;
	}
	
	//Function that checks if a page has loaded
	//Input: driver: Browser driver
	//		 textToFind: text to find in page
	//OutPut: void
	public static void pageLoadCheck (WebDriver driver, String textToFind) throws InterruptedException{
		String text;
		boolean pageLoaded = false;
		int i = 0;
		while(!pageLoaded) {
			try {
				text = driver.findElement(By.xpath("//*[@id=\"footer_nav\"]/p")).getText();
				if (text.contains(textToFind)) {
					pageLoaded = true;
					Thread.sleep(1000);
				}
			}
			catch(Exception e) {
				Thread.sleep(1000);
			}
			i++;
			if(i == 60) {
				System.out.println("Page load timeout. Exiting...");
				break;
			}
		}
		
	}
	
	//Function that enters text in a textbox
	//Input: driver: Browser driver
	//		 xPath: xpath of item
	//		 key: text to input
	//OutPut: void
	public static void enterText (WebDriver driver, String xPath, String key) {
		try {
			driver.findElement(By.xpath(xPath)).sendKeys(key);
		}
		catch(Exception e) {
			System.out.println("Error typing text into item with xpath: " + xPath);
			System.out.println(e);
		}
	}
	
	//Function that selects soemthing from a dropdown box
	//Input: driver: Browser driver
	//		 xPath: xpath of item
	//		 visibleText: text to select
	//OutPut: void
	public static void selectDropDown (WebDriver driver, String xPath, String visibleText) {
		try {
			Select country = new Select(driver.findElement(By.xpath(xPath)));
			country.selectByVisibleText(visibleText);
			Thread.sleep(1000);
		}
		catch(Exception e) {
			System.out.println("Error finding " + visibleText + " in drop down with xpath: " + xPath);
			System.out.println(e);
		}
	}
	
	//Function that takes a screenshot
	//Input: driver: Browser driver
	//		 directory: directory of project
	//OutPut: void
	public static void screenShot(WebDriver driver, String directory) throws IOException {
		try {
			File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
			FileUtils.copyFile(scrFile, new File(directory + "\\screenshots\\Purchase.png"));
		}
		catch(Exception e) {
			System.out.println("Cannot take screenshot");
			System.out.println(e);
		}
	}
}
