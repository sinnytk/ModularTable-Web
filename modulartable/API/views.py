from core.models import Slots
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.models import Slots
from .serializers import SlotSerializer


@api_view(['GET'])
def slot_list(request):
    slots = Slots.objects.all()
    serializer = SlotSerializer(slots, many=True)
    return Response(serializer.data)

