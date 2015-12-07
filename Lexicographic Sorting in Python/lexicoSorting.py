import math
def valueOf (str, order):
    d = [c for c in order]
    h = []
    for i in range(len(order)): # Complexity of loop: O(n)
        h.append(i +1)          # append() O(1)
                                # O(n)*O(1) = O(n)
    #Hash int value list which correponds to the char list of string with the order string that stored in list
    hash = dict(zip(d,h))
    charArray = [c for c in str]#O(n)
    count=0
    value=0
    length=0
    if str is None:
        value=0 
    else:
        length=len(str)
    #Based on the idea to convert a decemal number into polynomial function,
    #convert the str into corresponding polynomial function to calculate teh value of it. 
    while(count<length):        # Complexity of loop: O(n)
        value+=hash.get(charArray[count])*math.pow(10,length-count) # Complexity of get(): O(1)
        count=count+1
                             #C(n)*O(1) = O(n)
    return value    
                             #So the complexity of valueOf isO(n)+O(n)+O(n) =>O(n)                       
def lexiSort(n,s):
    intArray=[]
    for d in n: # Iterate O(n)
        intArray.append(valueOf(d,s))# O(1)*O(n) => O(n)
    #With the value list and the string list, hash them for exchanging the item in the list to the right place. 
    #Let the value be the key and the string be the value in hashtable. Then ordered int list can be used as index to arrange the string in order.
    hash=dict(zip(intArray,n)) # O(1)
    intArray.sort()#O(nlogn)
    new=[]
    for i in intArray: # O(n)
        new.append(hash.get(i)) #O(1)*O(1) => O(1)
    n=new
    return n
                       #O(n)+O(n)+O(nlogn)=>O(n(logn+2))=>O(nlogn)
if __name__=="__main__":
    valueOf('abc','abc')
    lexiSort(['abc','bca','acb'],'abc')